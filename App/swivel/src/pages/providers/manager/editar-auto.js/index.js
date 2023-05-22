import { useRouter } from 'next/router';

const EditCar = () => {

    const router = useRouter();

    const { auto_id } = router.query;

    return (
        <div>
            <h1>Page to edit car with ID: {auto_id}</h1>
        </div>
    );
};

export default EditCar;