import ZoomInstance from './'
import _ from 'lodash'

interface InstanceVariableDefinition {
	label: string
	name: string
	type?: string
}

interface InstanceVariableValue {
	[key: string]: string | number | undefined
}

export class Variables {
	private readonly instance: ZoomInstance

	constructor(instance: ZoomInstance) {
		this.instance = instance
	}

	/**
	 * @param name Instance variable name
	 * @returns Value of instance variable or undefined
	 * @description Retrieves instance variable from any Zoom instances
	 */
	public readonly get = (variable: string): string | undefined => {
		let data

		this.instance.parseVariables(variable, (value) => {
			data = value
		})

		return data
	}

	/**
	 * @param variables Object of variablenames and their values
	 * @description Updates or removes variable for current instance
	 */
	public readonly set = (variables: InstanceVariableValue): void => {
		const newVariables: { [variableId: string]: string | undefined } = {}

		for (const name in variables) {
			newVariables[name] = variables[name]?.toString()
		}

		this.instance.setVariables(newVariables)
	}

	/**
	 * @description Sets variable definitions
	 */
	public readonly updateDefinitions = (): void => {
		const globalSettings: Set<InstanceVariableDefinition> = new Set([
			// Status
			{ label: 'zoomOSC version', name: 'zoomOSCversion' },
			{ label: 'call status', name: 'callStatus' },
			{ label: 'Selected caller/group', name: 'selectedCaller' },
			{ label: 'Number of selectable groups', name: 'numberOfGroups' },
			{ label: 'Number of users in call', name: 'numberOfUsers' },
		])
		let userVariables = []
		// Which users in a group
		for (let index = 1; index-1 < this.instance.ZoomClientDataObj.numberOfGroups; index++) {
			userVariables.push({
				label: `Inside group`,
				name: `Inside${this.instance.ZoomUserData[index].zoomId.toString()}`,
			})
		}
		for (const key in this.instance.ZoomUserData) {
			if (Object.prototype.hasOwnProperty.call(this.instance.ZoomUserData, key)) {
				const user = this.instance.ZoomUserData[key]
				userVariables.push({ label: `name`, name: user.zoomId.toString() })
			}
		}
		const userVariablesDef: Set<InstanceVariableDefinition> = new Set(userVariables)
		const gallery: Set<InstanceVariableDefinition> = new Set([
			// Status
			{ label: 'gallery shape X', name: 'galleryShapeX' },
			{ label: 'gallery shape Y', name: 'galleryShapeY' },
			{ label: 'gallery count', name: 'galleryCount' },
		])

		let filteredVariables = [...globalSettings, ...userVariablesDef, ...gallery]

		this.instance.setVariableDefinitions(filteredVariables)
	}

	/**
	 * @description Update variables
	 */
	public readonly updateVariables = (): void => {
		const newVariables: InstanceVariableValue = {}
		if (this.instance.ZoomClientDataObj.selectedCallers.length === 0) {
			newVariables['selectedCaller'] = 'nothing selected'
		} else {
			newVariables['selectedCaller'] =this.instance.ZoomClientDataObj.selectedCallers.toString()
				// this.instance.ZoomUserData[this.instance.ZoomClientDataObj.selectedCaller]?.userName
		}
		newVariables['zoomOSCversion'] = this.instance.ZoomClientDataObj.zoomOSCVersion
		newVariables['callStatus'] = this.instance.ZoomClientDataObj.callStatus == 1 ? 'In meeting' : 'offline'
		newVariables['numberOfGroups'] = this.instance.ZoomClientDataObj.numberOfGroups
		newVariables['numberOfUsers'] = this.instance.ZoomClientDataObj.numberOfUsersInCall

		// TODO username
		for (let index = 1; index-1 < this.instance.ZoomClientDataObj.numberOfGroups; index++) {
			newVariables[`Inside${this.instance.ZoomUserData[index].zoomId.toString()}`] =
				this.instance.ZoomUserData[index].users?.toString()
		}
		for (const key in this.instance.ZoomUserData) {
			if (Object.prototype.hasOwnProperty.call(this.instance.ZoomUserData, key)) {
				const user = this.instance.ZoomUserData[key]
				newVariables[user.zoomId.toString()] = user.userName
			}
		}
		// this.instance.ZoomUserData.forEach(element => {
		// 	newVariables[element.zoomId.toString()] = element.userName
		// })
		newVariables['galleryShapeX'] = this.instance.ZoomClientDataObj.galleryShape[0]
		newVariables['galleryShapeY'] = this.instance.ZoomClientDataObj.galleryShape[1]
		newVariables['galleryCount'] = this.instance.ZoomClientDataObj.galleryCount

		this.set(newVariables)

		this.updateDefinitions()
	}
}
