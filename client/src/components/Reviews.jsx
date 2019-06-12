import React from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import ReadMoreAndLess from 'react-read-more-less';

class Reviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: 1,
            reviews: [{rating: 0, name:'', date:'', review:'', avatar:''}]
        }
        this.dateChanger = this.dateChanger.bind(this);
    }

    componentDidMount() {
        axios.get(`http://ec2-18-191-213-234.us-east-2.compute.amazonaws.com/reviews?uuid=${this.state.uuid}`)
        .then((response) => {
            console.log(response.data);
            this.setState({
                reviews: response.data
            },() => {console.log(this.state)});
        })
        .catch((error) => {
            console.log(error); 
        })
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.uuid !== prevProps.uuid) {
    //         axios.get(`http://localhost:3004/reviews?uuid=${this.state.uuid}`)
    //         .then((response) => {
    //             this.setState({
    //                 reviews: response.data
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error); 
    //         })
    //     }
    // }

    avgStar() {
        let array = this.state.reviews.map((review) => {
            return review.rating;
        });
        let num = array.reduce((acc, cur) => {
            return acc + cur;
        });
        return num / 5;
    }

    dateChanger(date) {
        return date.substring(6, 26);
    }

    render() {
        return(
            <div className='container-reviews'>
                <div className='avg-stars-container-reviews'>
                    <div className='avg-title-reviews'>AVERAGE RATING</div>
                    <div className='avg-num-reviews'>{this.avgStar()}</div>
                    <ReactStars  className='avg-stars-reviews' count={5} size={24} color1={'#E8E8E8'} color2={'#101820'} value={this.avgStar()} edit={false} />
                </div>
                {this.state.reviews.map((review, index) => {
                    return(
                        <div className='one-review-reviews' key={index}>
                            <img src={review.avatar.substring(1, review.avatar.length -1)} alt="Avatar-reviews" className="images-reviews"/>
                            <div className='review-data-reviews'>
                                <div className='names-reviews'>{review.name}</div>
                                <div className='dates-reviews'>{this.dateChanger(review.date)}</div>
                                <div className='star-text-reviews'>
                                    <ReactStars className='inline-stars-reviews' half={true} count={5} size={18} color1={'#E8E8E8'} color2={'#101820'} value={review.rating} edit={false} />
                                    <ReadMoreAndLess ref={this.ReadMore} className='text-reviews' readLessText='...See Less' readMoreText='See More'>{review.review}</ReadMoreAndLess>
                                </div>
                            </div>    
                        </div>
                    )
                }
            )}
            </div>
        )
            
    }
}
                    

export default Reviews;

