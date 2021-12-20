const API_KEY="6c53a344234c3b4db415fd373db01f75";
const BASE_PATH="https://api.themoviedb.org/3";

interface IMovie{
    id:number;
    backdrop_path: string;
    poster_path:string;
    title:string;
    overview:string;
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

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`).then(
        response=>response.json()
    );
}