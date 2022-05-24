import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Questionlayout({ children }) {
  const router = useRouter();
  const { latest } = useSelector((state) => state.step);
  const proficiencyNumber = Number(router.query.proficiencyNumber);

  useEffect(() => {
    if (latest.step < proficiencyNumber + 1) {
      if (proficiencyNumber === 1) {
        router.push('/biodata');
      } else {
        router.push(`/proficiencies/${proficiencyNumber - 1}`);
      }
    }
  }, [proficiencyNumber]); // eslint-disable-line

  return <div>{children}</div>;
}
