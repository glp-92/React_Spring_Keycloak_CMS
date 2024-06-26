# CMS Frontend

Implemented with React using Vite as structure manager. 

NodeJS must be installed
```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - # visit deb.nodesource.com if not sure about last version
sudo apt-get install -y nodejs
sudo apt update -y && sudo apt upgrade -y
sudo npm install -g npm@latest
```
Update to newest version
```
sudo npm update -g
sudo npm install -g n
sudo n latest
```
Create new React Vite project 
```
npm create vite@latest
```

### Dependencies
```
npm install react-router-dom
npm i markdown-to-jsx
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @fontsource-variable/roboto-mono
npm install @tanstack/react-query
```

### Run project
1. First time, is needed to build libraries 
  - `cd frontend/clientapp`
  - `npm install`
2. Run the frontend on dev mode (refreshing on change) `npm run dev` 
