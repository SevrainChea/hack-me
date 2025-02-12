import React, { useState } from 'react'
import { Box, Grid, Form, FormField, TextInput, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import { useMyContext } from 'context/MyContext'
import Employee from 'models/Employee'

interface EmployeeFormInput {
	firstname: string
	lastname: string
}

const initialState = { firstname: '', lastname: '' }

const EmployeesPage: React.FC = () => {
	const [inputs, setInputs] = useState<EmployeeFormInput>(initialState)
	const { employees, setEmployees } = useMyContext()

	const handleOnSubmit = ({ firstname, lastname }: EmployeeFormInput) => {
		const employee = new Employee(firstname, lastname)
		setEmployees([...employees, employee])
		setInputs(initialState)
	}

	const handleOnClickItem = (id: string) => {
		setEmployees(employees.filter(employee => employee.id !== id))
	}

	const employeesList = employees.map(employee => (
		<Box key={employee.id} direction='row' align='center'>
			{`${employee.firstname} ${employee.lastname}`}
			<Button
				icon={<FormClose />}
				onClick={() => handleOnClickItem(employee.id)}
			/>
		</Box>
	))
	return (
		<Grid
			rows={['auto', 'medium']}
			columns={['medium', 'auto']}
			gap='small'
			margin='small'
			areas={[
				{ name: 'header', start: [0, 0], end: [1, 0] },
				{ name: 'form', start: [0, 1], end: [0, 1] },
				{ name: 'list', start: [1, 1], end: [1, 1] },
			]}
		>
			<Box gridArea='header' align='center' width='95vw'>
				<h1>Employees management</h1>
			</Box>
			<Box gridArea='form' pad='medium' border='all' margin='small'>
				<Form
					value={inputs}
					onChange={nextValue => {
						setInputs(nextValue)
					}}
					onSubmit={({ value }) => handleOnSubmit(value)}
				>
					<FormField
						name='firstname'
						htmlFor='firstname-input-id'
						label='First name'
					>
						<TextInput id='firstname-input-id' name='firstname' />
					</FormField>
					<FormField name='lastname' htmlFor='lastname-input-id' label='Last name'>
						<TextInput id='lastname-input-id' name='lastname' />
					</FormField>
					<Box direction='row' gap='medium' justify='center'>
						<Button type='submit' primary label='Submit' />
					</Box>
				</Form>
			</Box>
			<Box gridArea='list' pad='medium' gap='xsmall' border='all'>
				{employeesList}
			</Box>
		</Grid>
	)
}

export default EmployeesPage
