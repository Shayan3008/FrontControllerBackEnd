FROM node:alpine 
WORKDIR /app/
COPY . .
RUN npm ci
EXPOSE 3001
ENTRYPOINT ["npm", "run", "serve"]