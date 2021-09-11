import { Injectable } from '@nestjs/common';
import HTMLParser, { HTMLElement } from 'node-html-parser';
import axios from 'axios';

enum MetricIndex {
  Rating = 0,
  RatingCount = 2,
  ReviewCount = 4,
}

export interface BookData {
  name: String;
  rating: Number;
  ratingCount: Number;
  reviewCount: Number;
}

@Injectable()
export class GoodReadsService {
  private fetchPage(url: string): Promise<string> {
    return axios.get(url)
      .then((data) => {
        return data.data;
      });
  }

  async search(url: string): Promise<BookData[]> {
    const page = await this.fetchPage(url);

    const root = HTMLParser(page);

    const books = root.querySelectorAll('.listWithDividers__item');

    return this.filterSerieBooks(books)
      .map(this.parseBookItem);
  }

  private filterSerieBooks(books: HTMLElement[]): HTMLElement[] {
    return books.reduce((agg, book): HTMLElement[] => {
      const bookIndex = getBookIndex(book);
      if (agg.length === 0 && bookIndex === 1) {
        agg.push(book);
      }
      if (agg.length !== 0 && bookIndex && bookIndex > agg.length - 1) {
        agg.push(book);
      }

      function getBookIndex(b): number {
        return Number(b.childNodes[0].text.split(' ')[1]);
      }
      return agg;
    }, [])
  }

  private parseBookItem(item: HTMLElement): BookData {
    const metricsContainer = findChildWithClass(findChildWithClass(item, 'responsiveBook').childNodes[0], 'u-paddingBottomXSmall');

    const name = metricsContainer.childNodes[0].childNodes[0].text;
    
    const ratingsContainer = findChildWithClass(metricsContainer, 'communityRating').childNodes[0];
    const rating = parseFloat(ratingsContainer.childNodes[MetricIndex.Rating].childNodes[0].childNodes[1].text);
    const ratingCount = parseInt(ratingsContainer.childNodes[MetricIndex.RatingCount].childNodes[0].childNodes[0].text.replace(/,/, ''));
    const reviewCount = parseInt(ratingsContainer.childNodes[MetricIndex.ReviewCount].childNodes[0].childNodes[0].text.replace(/,/, ''));

    console.log({ name, rating, ratingCount, reviewCount });

    return {
      name, rating, ratingCount, reviewCount
    };    

    function findChildWithClass(element: HTMLElement | Node | any, className: string) {
      return element.childNodes.find(node => (node as any).classNames.includes(className));
    }

    function findChildWithTag(element: HTMLElement | Node | any, tag: string) {
      return element.childNodes.find(node => (node as any).tagName === tag);
    }
  }
}
