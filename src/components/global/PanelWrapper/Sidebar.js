/** @jsxImportSource @emotion/react */
import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Box,
    Flex,
    Spacer,
    Stack,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Divider,
} from '@chakra-ui/react'
import NavLink from './NavLink'
import UserProfile from './UserProfile'
import LanguageGroupSwitcher from './LanguageGroupSwitcher'
import { NAV_ITEMS } from '../../../core/constants'
import styles from './styles'

function Sidebar () {
    const location = useLocation()
    return (
        <Flex
            height="100vh"
            width={{ base: 'full', sm: 'xs' }}
            direction="column"
            borderRightWidth="1px"
            px={6}
            py={8}>
            <Image
                src="/logo.png"
                alt="Logo"
                width="50px"/>
            <Divider my={4}/>
            <Accordion allowToggle>
                <Stack spacing={2}>
                    {NAV_ITEMS.map(
                        (navItem) => (
                            <Fragment key={navItem.to}>
                                {navItem.dropdown ? (
                                    <AccordionItem
                                        isFocusable={false}
                                        css={styles.withoutBorder}>
                                        <AccordionButton
                                            p="0"
                                            borderRadius="md"
                                            _focus={{boxShadow: 'none'}}>
                                            <NavLink
                                                to={navItem.to}
                                                label={navItem.label}
                                                icon={navItem.icon}
                                                isActive={location.pathname.includes(navItem.to)}
                                                isDropdown={true}
                                                width="100%" />
                                        </AccordionButton>
                                        <AccordionPanel pb={0}>
                                            {navItem.dropdownItems.map(
                                                (dropdownItem) => (
                                                    <NavLink
                                                        key={dropdownItem.to}
                                                        to={dropdownItem.to}
                                                        label={dropdownItem.label}
                                                        isActive={location.pathname.includes(dropdownItem.to)} />
                                                )
                                            )}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ) : (
                                    <NavLink
                                        to={navItem.to}
                                        label={navItem.label}
                                        icon={navItem.icon}
                                        isActive={location.pathname.includes(navItem.to)} />
                                )}
                            </Fragment>
                        )
                    )}
                </Stack>
            </Accordion>
            <Divider my={4}/>
            <Spacer />
            <LanguageGroupSwitcher />
            <Divider my={4}/>
            <UserProfile />
        </Flex>
    )
}

export default Sidebar
