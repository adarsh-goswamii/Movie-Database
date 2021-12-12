// * Data for what's popular section in homepage.

export const MovieData = (api_key) => {
    return async (dispatch) => {
        let ret = { movie: [], television: [] };
        let data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`);
        data = await data.json();
        data.results.map(({ id, poster_path, title, release_date, overview }) => {
            let temp = { id, poster_path, title, release_date, overview };
            ret.movie.push(temp);
        });

        data = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&page=1`);
        data = await data.json();
        data.results.map(({ id, poster_path, name, first_air_date, overview }) => {
            let temp = { id, poster_path, name, first_air_date, overview };
            ret.television.push(temp);
        });

        return ret;
    };
};

