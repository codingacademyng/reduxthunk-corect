const {createAsyncThunk, createSlice, configureStore} = require("@reduxjs/toolkit");
const axios = require("axios");
const API =  "https://jsonplaceholder.typicode.com/posts";

const initalState = {
    posts:[],
    loading:false,
    error:null,

}

//create Async Thunks
const fetchPosts = createAsyncThunk("posts/fetchPosts",async ()=>{
    const result =  await axios.get(API);
    
    return result.data;
});

//slice

const result = createSlice({
    name:"posts",
    initialState:initalState,
    extraReducers:(builder)=>{
        //pending result
        builder.addCase(fetchPosts.pending,(state,action)=>{
            state.loading=true;
        });
        //fulfilled
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.posts= action.payload;
            state.loading = false;

        });
        //rejected

        builder.addCase(fetchPosts.rejected,(state,action)=>{
            state.posts= [];
            state.loading = false;
            state.error=action.payload;


        });

    },
});

//generate reducer
const resultreducer = result.reducer;
//store
const store = configureStore({
    reducer:resultreducer,
})

//dispatch action
store.subscribe(()=>{
    console.log(store.getState());
});
store.dispatch(fetchPosts())


