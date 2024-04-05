import Svg, { Path } from 'react-native-svg';

export default function Logo({ width, height}) {
    return (
        <Svg fill="#fff" width={width} height={height} viewBox="0 0 24 24">
            <Path d="M2,11H8a1,1,0,0,0,1-1V4A1,1,0,0,0,8,3H2A1,1,0,0,0,1,4v6A1,1,0,0,0,2,11ZM3,5H7V9H3ZM23,7a1,1,0,0,1-1,1H12a1,1,0,0,1,0-2H22A1,1,0,0,1,23,7Zm0,10a1,1,0,0,1-1,1H12a1,1,0,0,1,0-2H22A1,1,0,0,1,23,17ZM3.235,19.7,1.281,17.673a1,1,0,0,1,1.438-1.391l1.252,1.3L7.3,14.289A1,1,0,1,1,8.7,15.711l-4.046,4a1,1,0,0,1-.7.289H3.942A1,1,0,0,1,3.235,19.7Z" />
        </Svg>
    )
}