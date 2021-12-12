export let TrendingData = (api_key) => {
    return async (dispatch) => {
        let ret = { today: [], week: [] };

        let data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&page=1`);
        data = await data.json();
        data.results.map(({ id, poster_path, title, release_date, overview }) => {
            let temp = { id, poster_path, title, release_date, overview };
            ret.today.push(temp);
        });

        data = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=1`);
        data = await data.json();

        data.results.map(({ id, poster_path, title, release_date, overview }) => {
            let temp = { id, poster_path, title, release_date, overview };
            ret.week.push(temp);
        });

        return ret;
    };
};