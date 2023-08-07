import Text from "@/widgets/text";
import Table from "@/widgets/table";

export const selectWidget = (type: string, index: number, isDesign: boolean) => {
    switch (type) {
        case 'text':
            return <Text index={index} isDesign={isDesign} key={index}/>
        case 'table':
            return <Table index={index} isDesign={isDesign} key={index}/>
        default:
            break;
    }
}