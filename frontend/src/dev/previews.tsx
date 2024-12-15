import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "../app/App.tsx";
import {MainRoute} from "../route/MainRoute.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/MainRoute">
                <MainRoute/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;