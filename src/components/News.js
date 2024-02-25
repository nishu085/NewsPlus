import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
      country : "in", 
      pageSize : 8,
      category: "general"
    }

    static propTypes = {
      country: PropTypes.string ,
      pageSize: PropTypes.number ,
      category :PropTypes.string 
    }

    constructor(){
        super();

        this.state = {
            articles : [],
            page:1  ,
            totalResults : 0 ,
            loading: false 
        }
    }

    async updateNews(){
      this.props.setProgress(10);
      try{      
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec90ef4e2d664a19b0cd2e8025c3401d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true}) ;
        this.props.setProgress(30);
        const res = await fetch(url);
        this.props.setProgress(50);
        const data = await res.json();
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }
    catch(e) {
        console.log("something is not working");
    } 
    }

    async componentDidMount(){
        this.updateNews() ;
    }

  // handlePrevClick = async () =>{
  //   try{      
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec90ef4e2d664a19b0cd2e8025c3401d&page=${this.state.page - 1 }&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true}) ;
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     this.setState({
  //         page : this.state.page-1 ,
  //         articles: data.articles,
  //         loading: false
  //     });
  // }
  // catch(e) {
  //     console.log("something is not working");
  // }  
  //   this.setState({page : this.state.page - 1}) ;
  //   this.updateNews() ;
  // }

  // handleNextClick = async () =>{

    // if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) ){
  
    //   try{      
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec90ef4e2d664a19b0cd2e8025c3401d&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true}) ;
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     this.setState({
    //         page : this.state.page+1 ,
    //         articles: data.articles,
    //         loading: false
    //     });
    //       }
    // catch(e) {
    //     console.log("something is not working");
    // }
    // }
  //   this.setState({page: this.state.page + 1})
  //   this.updateNews() ;
  // }

  fetchData = async() => {
    this.setState({ page : this.state.page + 1 })
    try{      
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec90ef4e2d664a19b0cd2e8025c3401d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true}) ;
      const res = await fetch(url);
      const data = await res.json();
      this.setState({
          articles: this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          loading: false
      });
  }
  catch(e) {
      console.log("something is not working");
  }
  }

  
  

  render() {
    return (
      
      <>

        <h1 className="text-center">NewsPlus - Top Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
        dataLength={this.state.articles.length} //This is important field to render the next data
        next={this.fetchData}
        hasMore={this.state.articles.length <= this.state.totalResults}
        loader={<Spinner/>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        >

        <div className="container">
        <div className="row">
            {this.state.articles.map((element,index) => {
            return <div className="col-md-4" key = {index}>
                      <NewsItem title={element.title} description={element.description}
                      imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
            })}
            
        </div>
        </div>
        {/* <div className="container d-flex justify-content-between">
<button disable={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize) } type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
</div> */}
        </InfiniteScroll>
      </>
    )
  }
}


export default News