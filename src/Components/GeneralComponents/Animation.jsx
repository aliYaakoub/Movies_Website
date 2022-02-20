import Lottie from "lottie-react";
import Anim from "../../assets/90464-loading.json";

const Animation = ({animation = false, width = null, height = null}) => {
    
    return (
        <Lottie 
            loop 
            autoPlay 
            animationData={animation ? animation : Anim} 
            style={width ? {width, height} : {width: 400, height: 400}} 
        />
    )
};

export default Animation;