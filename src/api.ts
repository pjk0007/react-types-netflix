const API_KEY="6c53a344234c3b4db415fd373db01f75";
const BASE_PATH="https://api.themoviedb.org/3";

interface IMovie{
    id:number;
    backdrop_path: string;
    poster_path:string;
    title:string;
    overview:string;
    name?:string;
}

export interface IGetMoviesResult{
    dates:{
        maximum:string;
        minimum:string;
    };
    page:number;
    results: IMovie[];
    total_page:number;
    total_results:number;
}

interface ITv{
    id:number;
    backdrop_path: string;
    poster_path:string;
    name:string;
    overview:string;
}

export interface IGetTvResult{
    page:number;
    results: ITv[];
    total_page:number;
    total_results:number;
}

export function getNowMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getPopularMovies(){
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getTopRatedMovies(){
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getUpComingMovies(){
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getAiringTodayTv(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getOnTheAirTv(){
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getPopularTv(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getTopRatedTv(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}

export function getSearchData(keyword:string){
    return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&region=kr&query=${keyword}`).then(
        response=>response.json()
    );
}