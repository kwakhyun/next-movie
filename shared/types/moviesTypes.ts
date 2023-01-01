import { MediaType } from './commonEnums';
import {
  DateString,
  ItemWithId,
  Maybe,
  PaginationResponse,
} from './commonTypes';
import { BasePerson } from './personTypes';

export interface Genre extends ItemWithId {
  name: string;
}

export interface Movie extends ItemWithId {
  title: string;
  overview: string;
  tagline: Maybe<string>;
  poster_path: string;
  backdrop_path: string;
  imdb_id: Maybe<string>;
  release_date: DateString;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  media_type: MediaType;
  runtime: number;
  adult: boolean;
  popularity: number;
  character: string;
}

export interface MovieImage {
  file_path: string;
}

export interface MovieVideo extends ItemWithId {
  key: string;
  name: string;
  type: string;
}

export type MovieCast = BasePerson & {
  character: string;
};

export type MovieCrew = BasePerson & {
  job: string;
};

export type MovieDetails = Movie & {
  images: { backdrops: MovieImage[] };
  videos: PaginationResponse<MovieVideo>;
  credits: { cast: MovieCast[]; crew: MovieCrew[] };
};
