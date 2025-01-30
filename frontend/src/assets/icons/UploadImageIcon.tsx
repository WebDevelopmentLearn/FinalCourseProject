

interface UploadImageIconProps {
    className: string;
}

export const UploadImageIcon = ({className}: UploadImageIconProps ) => {
    return (
        <svg
            className={className}
            fill="#000000"
            width="40px"
            height="40px"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>upload-cloud-line</title>
            <path
                d="M30.31,13c0-.1,0-.21,0-.32a10.26,10.26,0,0,0-10.45-10,10.47,10.47,0,0,0-9.6,6.1A9.74,9.74,0,0,0,1.6,18.4,9.62,9.62,0,0,0,11.25,28H15V26H11.25A7.65,7.65,0,0,1,11,10.74l.67,0,.23-.63a8.43,8.43,0,0,1,8-5.4,8.26,8.26,0,0,1,8.45,8,7.75,7.75,0,0,1,0,.8l-.08.72.65.3A6,6,0,0,1,26.38,26H21v2h5.38a8,8,0,0,0,3.93-15Z"></path>
            <path
                d="M22.28,21.85A1,1,0,0,0,23,20.14l-5-5-5,5a1,1,0,0,0,1.41,1.41L17,19V31.25a1,1,0,1,0,2,0V19l2.57,2.57A1,1,0,0,0,22.28,21.85Z"></path>
            <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
        </svg>
    )
};