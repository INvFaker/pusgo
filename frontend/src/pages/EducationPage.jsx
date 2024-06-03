import React from "react";
import Headline from "../components/Headline";
import CardBlog from "../components/CardBlog";
import { useState, useEffect } from "react";
import { client } from "../client";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import PageHeader from "../components/PageHeader";

function EducationPage() {
  const activeStyle = "text-blue-600 border-b-2 border-blue-600";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post-blog"]{
          title,
          slug {
            current
          },
          author,
          image {
            asset->{
              _id,
              url
            }
          },
          publishedAt,
          body[]{
            ...,
            _type == "image" => {
              asset->{
                _id,
                url
              }
            }
          },
          link,
          tags
        }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <div className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 mt-16">
          <PageHeader
            pageName="Education"
            pageDescription="Our blog offers educational articles on how to respond to
            earthquakes, safety tips, and seismology knowledge."
          />
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                >
                  Blog
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  aria-current="page"
                >
                  Event
                </a>
              </li>
            </ul>
          </div>
          <h2>You are viewing {posts.length}</h2>
          {console.log(posts)}
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
            {posts.map((post) => (
              <CardBlog
                key={post.slug.current}
                postUrl={`/edukasi/${post.slug.current}`}
                title={post.title}
                imgUrl={post.image.asset.url}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EducationPage;