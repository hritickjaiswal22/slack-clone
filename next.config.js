module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
};
