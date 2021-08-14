import { Request, Response, NextFunction } from "express"
import services from './services'

const { commands: commandService } = services()

const processData = (req: Request, res: Response, next: NextFunction) => {
    const { team_id: workspaceId, text } = req.body
    const { platform } = req.params

    return commandService({ platform, textPayload: text, workspaceId })
        .then((response: string | null) => res.status(200).json({
            response_type: 'in_channel',
            ...response && { text: response }
        }))
        .catch(next)
}

export {
    processData
}