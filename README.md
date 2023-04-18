# Frontend Mentor - Product feedback app solution

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- Keep track of any changes, even after refreshing the browser

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/productfeedbackapp-usign-nextjs-bsr_rJWvBm)
- Live Site URL: [https://product-feedback-app-fawn.vercel.app](https://product-feedback-app-fawn.vercel.app)

## My process

### Built with

- [Next.js](https://nextjs.org/) - React framework with SSR
- [MongoDB](https://www.mongodb.com) - For database
- [Prisma](https://prisma.io) - ORM for mongodb
- [TailwindCSS](https://tailwindcss.com/docs) - For styles
- [Recoil](https://recoiljs.org) - For state management
- TypeScript

### What I learned

Using Next.js with Prisma and MongoDB was a new experience for me and I learned a lot from it.

```js
export async function getServerSideProps() {
  const feedbackList = await prisma.feedback.findMany();

  return {
    props: { feedbackList },
  };
}
```

### Continued development

Planning to add authintication using auth0 and add more features like search and more filters

### Useful resources

- [Best practice for instantiating PrismaClient with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices) - Instantiating to avoid creating multiple instances of PrismaClient in development mode.
- [How to Run Async Await in Parallel with Javascript](https://medium.com/@omar.hsouna/how-to-run-async-await-in-parallel-with-javascript-19b91adfc45d) - This is an amazing article which helped me to decrease the time of updating two collections in the database by running them in parallel.

## Author

- Frontend Mentor - [@Abdelwahab07](https://www.frontendmentor.io/profile/Abdelwahab07)
- Twitter - [@Abdelwahab_07](https://www.twitter.com/Abdelwahab_07)
