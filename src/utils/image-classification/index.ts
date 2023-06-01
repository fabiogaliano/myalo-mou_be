import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import {
  DescribeImageResponse,
  TagImageResponse,
} from '@azure/cognitiveservices-computervision/esm/models';
import { FinalColor, extractColors } from 'extract-colors';
import getPixels from 'get-pixels';
import config from '@/config';

class ImageClassifier {
  endpoint: string;
  subscriptionKey: string;
  credentials: CognitiveServicesCredentials;
  client: ComputerVisionClient;

  constructor(azureEndpoint: string, azureSubscriptionKey: string) {
    if (azureEndpoint === '' || azureSubscriptionKey === '') {
      throw new Error('Azure endpoint and subscription key must be provided');
    }

    this.endpoint = azureEndpoint;
    this.subscriptionKey = azureSubscriptionKey;
    this.credentials = new CognitiveServicesCredentials(this.subscriptionKey);
    this.client = new ComputerVisionClient(this.credentials, this.endpoint);
  }

  async classifyImage(imageUrl: string) {
    let tagImageResult, describeImageResult;
    try {
      // const a = await this.client.tagImage(imageUrl)

      [tagImageResult, describeImageResult] = await Promise.allSettled([
        this.client.tagImage(imageUrl),
        this.client.describeImage(imageUrl),
      ]);
    } catch (error) {
      console.error(`Error classifying image: ${error}`);
      throw error;
    }

    const mergedTags = [
      ...new Set([
        ...getTagImageTags(tagImageResult as PromiseResult<TagImageResponse>),
        ...getDescribeImageTags(describeImageResult as any),
      ]),
    ];
    const describeImageCaptions = getDescribeImageCaptions(
      describeImageResult as PromiseResult<DescribeImageResponse>
    );

    console.log([...mergedTags, ...describeImageCaptions]);
    return [...mergedTags, ...describeImageCaptions];
  }

  async getColorsFromImage(imageUrl: string): Promise<FinalColor[]> {
    return new Promise((resolve, reject) => {
      getPixels(imageUrl, (err, pixels) => {
        if (err) {
          reject(err);
          return;
        }

        const data = [...pixels.data];
        const width = Math.round(Math.sqrt(data.length / 4));
        const height = width;

        const colorsResult = extractColors(
          { data, width, height },
          {
            distance: 0.2,
            hueDistance: 0.05,
            saturationDistance: 0.1,
            lightnessDistance: 0.2,
          }
        );

        resolve(colorsResult);
      });
    });
  }
}

function getTagImageTags(tagImageResult: PromiseResult<TagImageResponse>) {
  return tagImageResult.status === 'fulfilled'
    ? tagImageResult.value
        .tags!.filter((tag) => (tag.confidence ?? 0) > 0.35)
        .map((tag) => tag.name)
    : [];
}

function getDescribeImageTags(
  describeImageResult: PromiseResult<DescribeImageResponse>
) {
  return describeImageResult.status === 'fulfilled'
    ? describeImageResult.value.tags || []
    : [];
}

function getDescribeImageCaptions(
  describeImageResult: PromiseResult<DescribeImageResponse>
) {
  return describeImageResult.status === 'fulfilled'
    ? (describeImageResult.value.captions || [])
        .filter((caption) => (caption.confidence ?? 0) > 0.35)
        .map((caption) => caption.text)
        .filter((text): text is string => text !== undefined)
    : [];
}

type PromiseResult<T> = {
  status: 'fulfilled' | 'rejected';
  value: T;
  reason?: any;
};

export const imageClassierInstance = new ImageClassifier(
  config.azureEndpoint,
  config.azureSubscriptionKey
);
