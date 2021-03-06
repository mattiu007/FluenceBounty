use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;

module_manifest!();

pub fn main() {}

#[marine]
pub fn count(msg: String) -> String {
    let num: usize = msg.chars().count();
    let numstr = num.to_string();
    let concat = msg + " char count: " + &numstr;
    concat.to_string()
}

#[cfg(test)]
mod tests {
    use marine_rs_sdk_test::marine_test;

    #[marine_test(config_path = "../Config.toml", modules_dir = "../../artifacts")]
    fn non_empty_string(counter: marine_test_env::counter::ModuleInterface) {
        let actual = hello_world.hello("SuperNode".to_string());
        assert_eq!(actual.msg, "SuperNode".to_string().chars().count());
    }
}
