# myaló mou

Inspired in the pronunciation of "my mind" in Greek, myaló mou serves the purpose of entering our own world of visual ideas.

The main goal of this project is to create my own visual library without folders. I want to effortlessly access whatever I saved, from image to videos, by simply asking what I need.

At his core, most of the ideas are borrowed from https://mymind.com. This exploratory project aims at replicate it from a perspective that can be hosted locally first.

---
## Development

### podman

uninstall machine
- podman machine stop
- podman machine rm


start machine
- podman machine init
- podman pull mongo
- podman run --name myalomou_container -d -p 27017:27017 -v ./ docker.io/library/mongo:latest
  
db 
- podman exec -it myalomou_container bash // enter machine bash
- 

run pod
- podman run --name myalomou_container -d -p 27017:27017 -v ./mongodb_docker docker.io/library/mongo:latest 


copy data from pod
- podman cp [podname]:/data/db ./mongodb_docker

export data from db
- mongodump --uri "mongodb://127.0.0.1:27017/myalomou" --out ./backup

load data to db
- mongorestore --db databasename --verbose \path\dump\<dumpfolder>
---
### mongodb

run to enter mongo shell
- mongosh

### todos

- [x] make node.js typescript express server
- [x] use ai to identify 'description' for images
- [x] use ai to identify 'tags' for images
- [x] get color pallete present in image
- [x] try to figure out data structure + db implementation
- [x] type of content
  - [x] images / video  
    - [ ] add other image-specific properties (e.g., image resolution, aspect ratio, etc.)
- [ ] user creation
- [ ] image creation 
  - [ ] handle image upload/storing to filepath
- [ ] logger for route calls
- [ ] improve db storage + moving (abandon podman?)
- [ ] ?