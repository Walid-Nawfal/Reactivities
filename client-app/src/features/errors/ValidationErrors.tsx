import { Message } from "semantic-ui-react";

export interface Props {
    errors: any ;
}
 
export default function ValidationErrors({errors}: Props) {
    return (
        <Message error>
            {errors && (
               <Message.List>
                    {errors.map((err: any, i: any) => {
                        return <Message.Item key={i}> {err} </Message.Item>
                    })}
                </Message.List> 
            )}
        </Message>
    )
}