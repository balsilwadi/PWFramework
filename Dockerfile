FROM mcr.microsoft.com/playwright:v1.44.1-jammy


WORKDIR /repo
COPY ["package-lock.json*", "./"]
ENV HEADLESS=true
ENV NODE_OPTIONS=--max_old_space_size=12188

# Manually installing the playwright package in order to install the system dependencies which playwright needs
RUN npm install --no-package-lock --no-save playwright@$(node -pe "require('./package-lock.json').dependencies.playwright.version") && \
    npx playwright install-deps

# Install remaining node packages
COPY ["package.json", "./"]
RUN npm install && rm -rf /var/lib/apt/lists/*

COPY . .