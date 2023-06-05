import React from 'react'
import TranslateThisPhrase from './TranslateThisPhrase'
import SelectTranslation from './SelectTranslation'
import FillInTheBlank from './FillInTheBlank'
import MatchThese from './MatchThese'

export default function Tab ({
    data
}) {
    const props = {data}

    switch (data.type) {
        case 'translate_this_phrase':
            return <TranslateThisPhrase {...props} />
        case 'select_translation':
            return <SelectTranslation {...props} />
        case 'fill_in_the_blank':
            return <FillInTheBlank {...props} />
        case 'match_these_translations':
            return <MatchThese {...props} />
        case 'match_these_pairs':
            return <MatchThese {...props} />
        default:
            return <></>
    }
}