import { css } from '@emotion/react'

const styles = {
    nav: css`
        height: 80px;
    `,
    main: css`
        min-height: calc(100vh - 80px);

        >* {
            transition: width 300ms;
        }
    `,
    content: css`
        min-height: calc(100vh - 80px);
    `,
    withoutBorder: css`
        border: none !important;
    `
}
export default styles
