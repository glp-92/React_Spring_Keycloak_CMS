### Docker utilities

Delete all containers and volumes
```bash 
docker rm -vf $(docker ps -aq)
```
Delete all images 
```bash
docker rmi -f $(docker images -aq)
```
Build again images
```bash
docker compose up --build
```