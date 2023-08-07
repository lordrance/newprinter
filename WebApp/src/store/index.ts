import {configureStore} from '@reduxjs/toolkit'
import TempPageSlice from './slices/tempPageSlice'
import TempWidgetSlice from './slices/tempWidgetSlice'

export default configureStore({
    reducer: {
        tempPage: TempPageSlice,
        tempWidget: TempWidgetSlice
    }
})