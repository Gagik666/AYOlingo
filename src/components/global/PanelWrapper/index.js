/** @jsxImportSource @emotion/react */
import { Fragment, useState } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './styles'

const SIDEBAR_TOGGLED = {
    'true': '340px',
    'false': '80px',
}

function PanelWrapper ({
    children
}) {
    const [sidebar, setSidebar] = useState(true)

    return (
        <Fragment>
            <Header left={SIDEBAR_TOGGLED[sidebar]} />
            <Flex css={styles.main}>
                <Sidebar
                    SIDEBAR_TOGGLED={SIDEBAR_TOGGLED}
                    sidebar={sidebar}
                    setSidebar={setSidebar} />
                <Flex
                    flexDirection="column"
                    overflowX="hidden"
                    minHeight="100vh"
                    style={{width: `calc(100vw - ${SIDEBAR_TOGGLED[sidebar]})`}}>
                    <Box
                        width="100%"
                        py="5"
                        minHeight="100vh">
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Fragment>
    )
}

export default PanelWrapper
