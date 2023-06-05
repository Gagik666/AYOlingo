/** @jsxImportSource @emotion/react */
import { Image } from '@chakra-ui/react'

function Icon ({
    type,
    style,
    ...props
}) {
    return (
        <Image
            src={`/icons/${type}.svg`}
            alt={type}
            style={style}
            {...props} />
    )
}

export default Icon
