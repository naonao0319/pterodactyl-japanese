import React from 'react';
import Modal, { RequiredModalProps } from '@/components/elements/Modal';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import Field from '@/components/elements/Field';
import { ServerContext } from '@/state/server';
const join = (part1: string, part2: string) => {
    const p1 = part1.endsWith('/') ? part1.slice(0, -1) : part1;
    const p2 = part2.startsWith('/') ? part2.slice(1) : part2;
    return `${p1}/${p2}`;
};

export default ({ onFileNamed, onDismissed, ...props }: Props) => {
    const directory = ServerContext.useStoreState((state) => state.files.directory);

    const submit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        onFileNamed(join(directory, values.fileName));
        setSubmitting(false);
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{ fileName: '' }}
            validationSchema={object().shape({
                fileName: string().required().min(1),
            })}
        >
            {({ resetForm }) => (
                <Modal
                    onDismissed={() => {
                        resetForm();
                        onDismissed();
                    }}
                    {...props}
                >
                    <Form>
                        <Field
                            id={'fileName'}
                            name={'fileName'}
                            label={'ファイル名'}
                            description={'Enter the name that this file should be saved as.'}
                            autoFocus
                        />
                        <div css={tw`mt-6 text-right`}>
                            <Button>ファイル作成</Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
};
