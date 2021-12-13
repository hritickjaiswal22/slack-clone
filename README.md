# Amazon Clone

A slack clone built using NextJS and ReactJS with the realtime messaging feature.You can create public communities or chat with other users in real time with firebase authentication.

## Deployment

Deployed with the help of [Vercel](https://slack-clone-using-next-js.vercel.app/signin) <- Live URL

## Demo

![8bef065f-c0da-4efb-a251-8d072d06f5c5](https://user-images.githubusercontent.com/76635865/145765809-d9947df9-69fa-4706-8bf6-1d95d1f544f2.png)

## Performance

![Desktop Performance](https://user-images.githubusercontent.com/76635865/145766321-f93b87c4-ede3-4662-a6b9-725778e78a9d.png)
![Mobile Performance](https://user-images.githubusercontent.com/76635865/145766407-87795980-7cf0-41b9-b79c-e043f409e981.png)

## Features

- Responsive
- Statically Generated pages for better FCP.
- Hooks 
- Realtime chatting with other users
- Firebase Authentication
- Sending and receving images as Resource sharing


## Future Changes

- Reducing the TTI and TBT for mobile devices.
- Making the site more responsive and adding more animations


## Tech Stack

 React, Redux-Toolkit, Next JS, Firebase, SASS , Firebase Realtime Database


## Lessons Learned

This was my biggest project yet I had to implement realtime chat features using firbase's apis and had to use different hooks to mangage the messages and users.

## Optimizations

I used getStaticProps SSG so that the website has better FCP and I also optimised images and svgs .


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
