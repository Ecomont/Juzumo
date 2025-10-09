# Next Sanity App

This project is a Next.js application integrated with Sanity as a headless CMS. It allows users to manage content through an embedded Sanity Studio and displays various types of content on the front end.

## Features

- **Home Page**: Displays site settings, a hero section, featured fruits, bars, and reviews.
- **Fruits Page**: Shows a grid of fruits with images, names, and prices.
- **Bars Page**: Displays logos and links to maps for various bars.
- **Blog**: Lists blog posts with pagination and detailed views for each post.
- **Sanity Studio**: Embedded content management system for creating and editing content.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/next-sanity-app.git
   cd next-sanity-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local` and fill in the required values:
     ```
     SANITY_PROJECT_ID=your_project_id
     SANITY_DATASET=production
     SANITY_API_VERSION=2025-01-01
     SANITY_READ_TOKEN=your_read_token
     ```

## Running the Application

To start the development server, run:
```
npm run dev
```
Visit `http://localhost:3000` to view the application.

## Deployment

For deployment, ensure that the environment variables are set in your hosting provider's settings. Use the following command to build the application:
```
npm run build
```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.