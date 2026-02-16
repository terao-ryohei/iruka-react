import { Link } from "@tanstack/react-router";
import type { UserProfile } from "../../types";
import styles from "./UserCard.module.css";

type UserCardProps = {
	user: UserProfile;
};

export function UserCard({ user }: UserCardProps) {
	return (
		<div className={styles.card}>
			<h3 className={styles.name}>{user.name}</h3>
			<p className={styles.info}>@{user.username}</p>
			<p className={styles.info}>{user.email}</p>
			<p className={styles.info}>{user.company.name}</p>
			<Link
				to="/users/$userId"
				params={{ userId: String(user.id) }}
				className={styles.link}
			>
				View Profile
			</Link>
		</div>
	);
}
