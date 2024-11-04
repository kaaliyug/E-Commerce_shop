import React from "react";
import { useStateContext } from "../context/stateContext";

export default function Loading() {
    const { isLoading } = useStateContext()
    if (!isLoading) return;

    return (
        <div className="loading_container">
            <div className="loading_item">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect fill="#FFF" width="100%" height="100%"/><rect fill='#FF156D' stroke='#FF156D' strokeWidth='30' strokeLinejoin='round' width='30' height='30' x='85' y='85' rx='0' ry='0'><animate attributeName='rx' calcMode='spline' dur='2' values='15;15;5;15;15' keySplines='.5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1' repeatCount='indefinite'></animate><animate attributeName='ry' calcMode='spline' dur='2' values='15;15;10;15;15' keySplines='.5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1' repeatCount='indefinite'></animate><animate attributeName='height' calcMode='spline' dur='2' values='30;30;1;30;30' keySplines='.5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1' repeatCount='indefinite'></animate><animate attributeName='y' calcMode='spline' dur='2' values='40;170;40;' keySplines='.6 0 1 .4;0 .8 .2 1' repeatCount='indefinite'></animate></rect></svg>
                <h1>Loading...</h1>
            </div>
        </div>
    )
}