import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        white: {
            100: '#ffffff',
        },
        grey: {
            100: '#e2e8f0',
            200: '#ebebeb',
            300: '#8d878c',
        },
        red: {
            100: '#ed143d',
        },
        blue: {
            100: '#4154b3',
            200: '#343c49',
            300: '#546180',
            400: '#3182ce',
        },
        purple: {
            100: '#b869ff'
        }
    },
    components: {
        Button: {
            baseStyle: {
                _focus: {boxShadow: 'none'}
            }
        },
        Switch: {
            baseStyle: {
                boxShadow: 'none !important',
            }
        },
    },
    styles: {
        global: {
            body: {
                overflowX: 'hidden',
            },
            path: {
                stroke: 'inherit'
            },
            span: {
                boxShadow: 'inherit !important'
            },
            'button:focus': {
                boxShadow: 'none !important'
            },
            a: {
                textDecoration: 'none !important',
                _focus: {
                    boxShadow: 'none !important'
                }
            }
        }
    }
})

export default customTheme
