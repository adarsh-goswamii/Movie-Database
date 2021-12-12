export let TrailerData = (api_key) => {
    return async (dispatch) => {
        let ret = { theatre: [], trending: [] };

        let data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=1`);
        data = await data.json();
        await data.results.map(async (movie) => {
            // all we need is movie id then we can search for trailers or any videos that are available on youtube.
            let video_path = await getVideos(movie.id, api_key);
            let temp = {
                id: movie.id,
                movie_name: movie.title,
                backdrop_path: movie.backdrop_path,
                video_path: video_path
            };

            ret.theatre.push(temp);
        });

        data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`);
        data = await data.json();
        await data.results.map(async (movie) => {
            // console.log("map iteration started");
            let video_path = await getVideos(movie.id, api_key);
            // console.log("Got the result from getVideos", video_path);
            const temp = {
                id: movie.id,
                backdrop_path: movie.backdrop_path,
                video_path: video_path,
                movie_name: movie.title
            };

            ret.trending.push(temp);
        });

        return ret;
    };
};

async function getVideos(id, api_key) {
    // console.log("get videos invoked");
    let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`);
    response = await response.json();

    for (let data of response.results) {
        // console.log(data);
        if (data.site === 'YouTube' && data.type === 'Trailer') {
            // console.log("value returned");
            return data.key;
        }
    }

    return response;
};