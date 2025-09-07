# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app

# Copy only package.json first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Clean previous builds (inside project)
RUN rm -rf dist/*

# Build Angular app
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy only the built Angular files
COPY --from=build /app/dist/angular-app/* /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
