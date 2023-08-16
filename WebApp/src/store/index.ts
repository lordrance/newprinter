import {configureStore} from '@reduxjs/toolkit'
import TempPageSlice from './slices/tempPageSlice'
import TempWidgetSlice from './slices/tempWidgetSlice'
import TopNavSlice from './slices/topNavSlice'

// redux，模板，组件，顶部导航
export default configureStore({
    reducer: {
        tempPage: TempPageSlice,
        tempWidget: TempWidgetSlice,
        topNav: TopNavSlice
    }
})