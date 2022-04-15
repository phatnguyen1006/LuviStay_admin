import { Affix, Menu } from "antd";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { IMenuItem, menus } from "../options";
const { SubMenu } = Menu;

export default function SidebarMenu(): ReactElement {

	function MenuItem({ option, ...res }: { option: IMenuItem }): ReactElement {
		if (option.subMenu) return (
			<SubMenu title={option.title} key={option.key} icon={<option.icon />} {...res}>
				{option.subMenu.map(item => {
					return (
						<MenuItem option={item} key={item.key} />
						);
					})}
			</SubMenu>
		);
		
        return (
			<Menu.Item title={option.title} key={option.key} icon={option.icon ? <option.icon /> : <></>} {...res}>
				<Link to={option.path}>
					{option.title}
				</Link>
			</Menu.Item>
		);
    }
	
	return <Affix>
		<Menu theme={"dark"} defaultSelectedKeys={["dashboard"]} mode="inline">
			{menus.map(menu => <MenuItem option={menu} key={menu.key} />)}
		</Menu>
	</Affix>;
}