import EmployeeProfile from '../../components/EmployeeProfile/EmployeeProfile';

export default function EmployeePage({ params }) {
  const { id } = params;

  return <EmployeeProfile id={id} />;
}
