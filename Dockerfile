# Use a stable Node base image
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies from package.json (package-lock.json is intentionally ignored by .dockerignore)
COPY package.json .
RUN npm install --silent

# Copy source and build
COPY . .
RUN npm run build

# Runtime image
FROM node:20-alpine AS runtime
WORKDIR /portfolio
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
