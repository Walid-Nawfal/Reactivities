import { Message } from "semantic-ui-react";

export interface Props {
    errors: string[] | null;
}
 
export default function ValidationErrors({errors}: Props) {
    return (
        <Message error>
            {errors && (
               <Message.List>
                    {errors.map((err: any, i) => {
                        return <Message.Item key={i}> {err} </Message.Item>
                    })}
                </Message.List> 
            )}
        </Message>
    )
}