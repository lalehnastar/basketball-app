import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://typeset-beta.imgix.net/elite-daily/2015/11/15214332/KobeFro.jpg',
  
  },
  {
    src: 'http://calatoriiprinsunet.ro/wp-content/uploads/2014/09/CPS-Michael-Jordan-e1407429068288.jpg',
   
  },
  {
    src: 'https://suracapulco.mx/wp-content/uploads/2018/03/14009198w-800x400.jpg',
  
  },
  {
    src: 'https://i.cdn.turner.com/nba/nba/.element/media/2.0/teamsites/spurs/kawhimikehakeem.jpg',
  
  },
  {
    src:'https://s.yimg.com/ny/api/res/1.2/nSnrx0hoj7j5WxUtqDjQFQ--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en-US/homerun/csnchicago.com/a09c1f7c84024d5042efbb4dfc5884ed'
  },
  {
    src:'https://pontofinalmacau.files.wordpress.com/2016/01/3-kobe-bryant.jpg?w=723'
  }

];

class HomeCarosel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default HomeCarosel;