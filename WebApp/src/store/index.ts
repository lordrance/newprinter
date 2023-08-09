import {configureStore} from '@reduxjs/toolkit'
import TempPageSlice from './slices/tempPageSlice'
import TempWidgetSlice from './slices/tempWidgetSlice'
import TopNavSlice from './slices/topNavSlice'

export default configureStore({
    reducer: {
        tempPage: TempPageSlice,
        tempWidget: TempWidgetSlice,
        topNav: TopNavSlice
    }
})