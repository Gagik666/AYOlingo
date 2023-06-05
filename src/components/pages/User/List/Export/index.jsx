import { useState, useRef } from 'react'
import ReactExport from 'react-export-excel'
import { Button } from '@chakra-ui/react'
import { useListUsers } from '../../../../../core/hooks'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export default function Export() {
    const refDownloadButton = useRef();
    const [dataset, setDataset] = useState();
    const [loading, setLoading] = useState(false);
    const { listUsers } = useListUsers();

    const getAllUsers = async (allUsers = [], nextToken = null) => new Promise((resolve) => {
        const params = { limit: 300 };
        if (nextToken) params.nextToken = nextToken;

        const onSuccess = (response) => {
            const { items, nextToken } = response.data.listUsers;
            const users = items.map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }))
            const newAllUsers = [...allUsers, ...users];
            if (nextToken) {
                return resolve(getAllUsers(newAllUsers, nextToken))
            }
            return resolve(newAllUsers);
        }

        listUsers(params, { onSuccess })
    })

    const onClick = async () => {
        setLoading(true);
        const dataset = await getAllUsers();
        setDataset(dataset);

        setTimeout(() => {
            setLoading(false);
            refDownloadButton.current.click()
            setDataset(null);
        }, 0)
    }

    if (dataset) {
        return (
            <ExcelFile element={
                <Button
                    ref={refDownloadButton}
                    size="sm">
                    Download
                </Button>
            }>
                <ExcelSheet data={dataset} name="Employees">
                    <ExcelColumn label="First Name" value="firstName"/>
                    <ExcelColumn label="Last Name" value="lastName"/>
                    <ExcelColumn label="Email" value="email"/>
                </ExcelSheet>
            </ExcelFile>
        )
    }

    return (
        <Button
            isLoading={loading}
            size="sm"
            onClick={onClick}>
            Export
        </Button>
    )
}
