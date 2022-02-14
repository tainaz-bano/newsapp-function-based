import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setarticle] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalArticles, settotalarticle] = useState(0)


  useEffect(() => {
    const updateNews = async () => {
      props.setProgress(10);
      setLoading(true)
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea5146722055494b8da0d6568c2686d3&page=${page}&pageSize=${props.pageSize}`;
      console.log(page);
      let data = await fetch(url);
      let parseddata = await data.json();
      setarticle(parseddata.articles)
      settotalarticle(parseddata.totalResults)
      props.setProgress(100);
      setLoading(false)
    }

    console.log("useeffect ran");
     updateNews();
  }, [])



  const fetchMoreData = async () => {
    const pageno=await page;
    setpage(pageno+1)
    console.log(pageno);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ea5146722055494b8da0d6568c2686d3&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    setarticle(article.concat(parseddata.articles))
    settotalarticle(parseddata.totalResults)
    setLoading(false)
  };


  let { mode } = props;

  return (

    <>
      <div className='container my-3'>
        <h2 className='text-center' style={{ color: mode === 'dark' ? 'white' : 'black' }}>NewsMonkey - Top Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-5">
              {article.map((element, index) => {
                return <div className="col-md-4 my-3" key={index}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} img={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/img/2022/02/11/1600x900/nirmala_sitharaman_1644562242946_1644562250427.JPG"} newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )

}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News